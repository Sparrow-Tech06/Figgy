document.addEventListener("DOMContentLoaded", function () {
    // Modal HTML dynamically inject karna
    const modalHTML = `
    <div class="modal fade" id="backConfirmModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center p-3">
          
          <!-- Icon/Image -->
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png" alt="Exit" width="80" class="mx-auto d-block mb-3"/>

          <!-- Title -->
          <h5 class="fw-bold">Exit this Page?</h5>
          <p class="text-muted mb-3">Are you sure you want to go back?</p>

          <!-- Buttons -->
          <div class="d-flex justify-content-center gap-3">
            <button id="confirmBackYes" class="btn btn-success px-4">YES</button>
            <button id="confirmBackNo" class="btn btn-danger px-4" data-bs-dismiss="modal">NO</button>
          </div>
        </div>
      </div>
    </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Bootstrap modal instance
    const modal = new bootstrap.Modal(document.getElementById('backConfirmModal'));

    const yesBtn = document.getElementById("confirmBackYes");

    // Target all back links → href="javascript:history.back()" OR class="back-link"
    const backLinks = document.querySelectorAll('a[href="javascript:history.back()"], a.back-link');

    backLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            modal.show();
        });
    });

    yesBtn.addEventListener("click", function () {
        window.history.back();
    });
});
